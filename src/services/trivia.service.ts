import Model from '../database/models/trivia.model';

class Service {
  async create(body: object) {
    return await Model.create(body);
  }

  async getAll(pagination: number) {
    return await Model.find({ deleted: false })
      .limit(10)
      .skip(pagination)
      .sort({ createdAt: 'desc' })
      .select('-__v');
  }

  async update(searchDetails: object, update: object) {
    return await Model.findOneAndUpdate({ ...searchDetails, deleted: false }, update, {
      new: true,
    }).select('-__v');
  }

  async find(searchData: object) {
    return await Model.find({ ...searchData, deleted: false }).select('-__v');
  }

  async findOne(searchData: object) {
    return Model.findOne({ ...searchData, deleted: false }).select('-__v');
  }

  async softDelete(searchParams: object) {
    return await Model.findOneAndUpdate(
      { ...searchParams, deleted: false },
      { deleted: true },
      {
        new: true,
      },
    ).select('-__v');
  }

  async hardDelete(searchParams: object) {
    return await Model.findOneAndDelete(searchParams).select('-__v');
  }

  async findOneRandom(searchData: object) {
    const randomDocument = await Model.aggregate([
      { $match: { ...searchData, deleted: false } },
      { $sample: { size: 1 } },
    ]);

    return randomDocument.length > 0 ? randomDocument[0] : null;
  }

  // Define your migration logic
  async migrate() {
    try {
      // Find all documents that don't have the "deleted" field
      const documentsToUpdate = await Model.find();

      // Create an object to keep track of the unique 'text' values
      const uniqueTexts: Record<string, boolean> = {};

      // Delete duplicate documents based on the 'text' field
      for (const document of documentsToUpdate) {
        if (uniqueTexts[document.text]) {
          // If a document with the same 'text' already exists, delete it
          await Model.deleteOne({ _id: document._id });
          console.log(`Document deleted (duplicate text): ${document.text}`);
        } else {
          // Mark the 'text' as seen
          uniqueTexts[document.text] = true;
          console.log('Document migrated');
        }
      }

      console.log(`Updated ${documentsToUpdate.length} documents.`);
    } catch (error) {
      console.error('Migration error:', error);
    } finally {
      console.log('Migration completed successfully');
    }
  }
}

export const triviaService = new Service();
