import type { Context } from 'hono';
import IdeaPocket, { IIdeaPocket } from '../db/models/IdeaPocket';
import Card from '../db/models/Card';

export const createPocket = async (c: Context): Promise<Response> => {
  try {
    const body = await c.req.json();
    const pocket: IIdeaPocket = new IdeaPocket({
      ...body,
      createdBy: c.get('user').id,
      createdAt: new Date(),
    });
    await pocket.save();
    return c.json(pocket, 201);
  } catch (error) {
    return c.json({ message: 'Error creating pocket', error }, 500);
  }
};

export const getPockets = async (c: Context): Promise<Response> => {
  try {
    const pockets = await IdeaPocket.find({ createdBy: c.get('user').id });
    return c.json(pockets);
  } catch (error) {
    return c.json({ message: 'Error fetching pockets', error }, 500);
  }
};

export const updatePocket = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const pocket = await IdeaPocket.findByIdAndUpdate(id, body, { new: true });
    if (!pocket) {
      return c.json({ message: 'Pocket not found' }, 404);
    }
    return c.json(pocket);
  } catch (error) {
    return c.json({ message: 'Error updating pocket', error }, 500);
  }
};

export const deletePocket = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param();
    const pocket = await IdeaPocket.findByIdAndDelete(id);
    if (!pocket) {
      return c.json({ message: 'Pocket not found' }, 404);
    }
    await Card.deleteMany({ pocketId: id });
    return c.json({ message: 'Pocket and associated cards deleted' });
  } catch (error) {
    return c.json({ message: 'Error deleting pocket', error }, 500);
  }
};