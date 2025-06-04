import type { Context } from 'hono';
import type { ICard } from '../models/Card.ts';
import Card from '../models/Card.ts';

export const createCard = async (c: Context): Promise<Response> => {
  try {
    const { pocketId } = c.req.param();
    const body = await c.req.json();
    const card: ICard = new Card({
      ...body,
      pocketId,
      createdBy: c.get('user').id,
    });
    await card.save();
    return c.json(card, 201);
  } catch (error) {
    return c.json({ message: 'Error creating card', error }, 500);
  }
};

export const getCards = async (c: Context): Promise<Response> => {
  try {
    const { pocketId } = c.req.param();
    const cards = await Card.find({ pocketId });
    return c.json(cards);
  } catch (error) {
    return c.json({ message: 'Error fetching cards', error }, 500);
  }
};

export const updateCard = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const card = await Card.findByIdAndUpdate(id, body, { new: true });
    if (!card) {
      return c.json({ message: 'Card not found' }, 404);
    }
    return c.json(card);
  } catch (error) {
    return c.json({ message: 'Error updating card', error }, 500);
  }
};

export const deleteCard = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param();
    const card = await Card.findByIdAndDelete(id);
    if (!card) {
      return c.json({ message: 'Card not found' }, 404);
    }
    return c.json({ message: 'Card deleted' });
  } catch (error) {
    return c.json({ message: 'Error deleting card', error }, 500);
  }
};