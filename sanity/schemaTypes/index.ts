import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import { productType } from './producttype'
import { ordertype } from './ordertype'
import { salesType } from './salestype'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType,ordertype,salesType],
}
