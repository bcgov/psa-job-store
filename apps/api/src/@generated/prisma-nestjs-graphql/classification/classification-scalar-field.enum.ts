import { registerEnumType } from '@nestjs/graphql';

export enum ClassificationScalarFieldEnum {
  id = 'id',
  code = 'code',
}

registerEnumType(ClassificationScalarFieldEnum, { name: 'ClassificationScalarFieldEnum', description: undefined });
