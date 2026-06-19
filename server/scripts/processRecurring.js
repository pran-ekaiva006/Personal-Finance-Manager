import Transaction from "../models/Transaction.js";

export const processRecurringTransactions = async () => {
  try {
    console.log("🔄 Processing recurring transactions...");

    // Find all unique transactions that are recurring templates
    const recurringTemplates = await Transaction.findAll({
      where: { isRecurring: true }
    });

    const now = new Date();

    for (const t of recurringTemplates) {
      // Find the most recent occurrence of this specific recurring transaction structure
      const newestOccurrence = await Transaction.findOne({
        where: {
          UserId: t.UserId,
          type: t.type,
          category: t.category,
          amount: t.amount,
          description: t.description,
          isRecurring: true
        },
        order: [["date", "DESC"]]
      });

      if (!newestOccurrence) continue;

      const lastDate = new Date(newestOccurrence.date);
      const diffMs = now.getTime() - lastDate.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      let shouldInsert = false;
      if (t.frequency === "weekly" && diffDays >= 7) {
        shouldInsert = true;
      } else if (t.frequency === "monthly" && diffDays >= 30) {
        shouldInsert = true;
      }

      if (shouldInsert) {
        console.log(`🌱 Inserting recurring transaction: ${t.description} (${t.category}, Rs.${t.amount})`);
        await Transaction.create({
          type: t.type,
          category: t.category,
          amount: t.amount,
          description: t.description,
          date: now,
          isRecurring: true,
          frequency: t.frequency,
          UserId: t.UserId
        });
      }
    }
    console.log("✅ Processing recurring transactions complete.");
  } catch (err) {
    console.error("❌ Failed to process recurring transactions:", err);
  }
};
