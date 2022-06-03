import { size } from 'lodash';

/**
 * То что пришло преобразуется в массив и отбрасывается все что не имеет значения
 * @param entity
 */
export const length = (entity) => size(entity)

