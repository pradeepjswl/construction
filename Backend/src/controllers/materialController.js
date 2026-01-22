import { Material } from '../models/Material.js';

export const createMaterial = async (req, res) => {
  try {
    const { name, category, quantity, unit, currentStock, minStockLevel, maxStockLevel, unitPrice, supplier, location, description, reorderQuantity, creator } = req.body;

    const material = new Material({
      name,
      category,
      quantity,
      unit,
      currentStock,
      minStockLevel,
      maxStockLevel,
      unitPrice,
      supplier,
      location,
      description,
      reorderQuantity,
      creator,
    });

    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const { category, lowStock } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (lowStock === 'true') {
      filter.$expr = { $lte: ['$currentStock', '$minStockLevel'] };
    }

    const materials = await Material.find(filter).sort({ name: 1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMaterial = async (req, res) => {
  try {
    const { name, category, quantity, unit, currentStock, minStockLevel, maxStockLevel, unitPrice, supplier, location, description, reorderQuantity } = req.body;

    const material = await Material.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        quantity,
        unit,
        currentStock,
        minStockLevel,
        maxStockLevel,
        unitPrice,
        supplier,
        location,
        description,
        reorderQuantity,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMaterialStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    material.currentStock = Math.max(0, material.currentStock + quantity);
    material.updatedAt = new Date();
    await material.save();

    res.json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLowStockMaterials = async (req, res) => {
  try {
    const materials = await Material.find({
      $expr: { $lte: ['$currentStock', '$minStockLevel'] },
    });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
