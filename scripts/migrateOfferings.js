require('dotenv').config();

const mongoose = require('mongoose');

const Offering = require('../models/Offering');
const Registration = require('../models/Registration');

async function migrateOfferings() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB connected');
        console.log('Starting offering reference migration...');
        console.log('-----------------------------------');

        // 1. Get all OLD offerings
        const oldOfferings = await Offering.find({
            term: '1-2026'
        });

        console.log(
            `Old offerings found: ${oldOfferings.length}`
        );

        const oldOfferingIds = oldOfferings.map(
            offering => offering._id
        );

        // 2. Find registrations still pointing to OLD offerings
        const registrations = await Registration.find({
            offeringId: {
                $in: oldOfferingIds
            }
        });

        console.log(
            `Registrations referencing old offerings: ${registrations.length}`
        );

        console.log('-----------------------------------');

        let updated = 0;
        let skipped = 0;

        // 3. Fix every registration
        for (const registration of registrations) {

            const oldOffering = oldOfferings.find(
                offering =>
                    String(offering._id) ===
                    String(registration.offeringId)
            );

            if (!oldOffering) {
                console.log(
                    `SKIPPED: old offering not found for ${registration._id}`
                );

                skipped++;
                continue;
            }

            // Find corresponding NEW offering
            const newOffering = await Offering.findOne({
                courseId: oldOffering.courseId,
                section: oldOffering.section,
                term: '2026-1'
            });

            if (!newOffering) {
                console.log(
                    `SKIPPED: No 2026-1 offering for course ${oldOffering.courseId}, section ${oldOffering.section}`
                );

                skipped++;
                continue;
            }

            // Update BOTH fields
            registration.offeringId = newOffering._id;
            registration.term = '2026-1';

            await registration.save();

            updated++;

            console.log(
                `UPDATED ${registration._id}: ${oldOffering._id} -> ${newOffering._id}`
            );
        }

        console.log('-----------------------------------');
        console.log(`Updated registrations: ${updated}`);
        console.log(`Skipped registrations: ${skipped}`);

        // 4. Final verification
        const remainingReferences =
            await Registration.countDocuments({
                offeringId: {
                    $in: oldOfferingIds
                }
            });

        const oldTermRemaining =
            await Registration.countDocuments({
                term: '1-2026'
            });

        console.log(
            `Registrations still using old term 1-2026: ${oldTermRemaining}`
        );

        console.log(
            `Registrations still referencing old offerings: ${remainingReferences}`
        );

        console.log('-----------------------------------');

        if (
            remainingReferences === 0 &&
            oldTermRemaining === 0
        ) {
            console.log(
                'Migration completed successfully.'
            );
        } else {
            console.log(
                'Some registrations could not be migrated.'
            );
        }

    } catch (error) {

        console.error('Migration failed:');
        console.error(error);

    } finally {

        await mongoose.disconnect();

        console.log('MongoDB disconnected');
    }
}

migrateOfferings();