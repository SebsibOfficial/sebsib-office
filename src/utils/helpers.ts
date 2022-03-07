/* eslint-disable */
// @ts-ignore
import { createObjectID } from 'mongo-object-reader';
/* eslint-enable */

export function generateId () {
  return createObjectID();
}