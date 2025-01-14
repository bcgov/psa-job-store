import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  NotEquals,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import {
  EmployeeGroupClassificationsModel,
  ProfessionsModel,
} from '../../../redux/services/graphql-api/job-profile-types';
import { OverviewField, ProgramOverviewField, TitleField } from '../../job-profiles/components/job-profile.component';

export function IsNotNull(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isNotNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value !== null && value !== undefined && value.toString().length > 0;
        },
      },
    });
  };
}

function ValidProfessionsValidator(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'validProfessionsValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: ProfessionsModel[]) {
          if (!Array.isArray(value) || value.length === 0) {
            return false;
          }

          // If there's only one profession and its jobFamily is -1, fail
          if (value.length === 1 && value[0].jobFamily === -1) {
            return false;
          }

          // Ensure at least one profession has a valid jobFamily
          return value.some((profession) => profession.jobFamily !== -1);
        },
        defaultMessage() {
          return 'At least one profession must be selected.';
        },
      },
    });
  };
}

export class BasicDetailsValidationModel {
  // // New properties
  // @IsNotEmpty()
  // @Length(5, 100)
  // department: string;

  // @Min(1)
  // @Max(10)
  // teamSize: number;

  // @IsArray()
  // @ArrayMinSize(1)
  // @ArrayMaxSize(5)
  // keyResponsibilities: string[];

  // Override properties from parent

  @ValidateNested()
  @Type(() => TitleField)
  title: TitleField | string;

  @JobStoreNumberValidator()
  jobStoreNumber: string;

  @EmployeeClassificationGroupValidator()
  employeeClassificationGroups: EmployeeGroupClassificationsModel[];

  // @IsNotNull({ message: 'Classification must be selected' })
  // classification: string | null;

  @IsNotNull({ message: 'Job role must be selected' })
  jobRole: number | null;

  @ArrayMinSize(1, { message: 'At least one report-to relationship must be selected.' })
  reportToRelationship: string[];

  @ArrayMinSize(1, { message: 'At least one scope of responsibility must be selected.' })
  scopeOfResponsibility: number | number[] | null; // number[] is latest change, used to allow only single selection

  @ArrayMinSize(1, { message: 'At least one ministry must be selected.' })
  ministries: string[];

  @IsNotEmpty({ message: 'Job context must be provided.' })
  @NotEquals('<p><br></p>', { message: 'Job context must be provided.' })
  jobContext: string;

  @ValidProfessionsValidator()
  professions: ProfessionsModel[];

  originalJobStoreNumber: string;
  role: number;
  classificationReviewRequired: boolean;
  all_reports_to: boolean;
  all_organizations: boolean;
  overview: OverviewField | string;
  program_overview: ProgramOverviewField | string;
}

export function JobStoreNumberValidator(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'jobStoreNumberValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Access the validation status through a custom context
          const context = args.object as any;
          const isValidStatus = context._validationStatus === 'valid';
          const hasValue = value && value.length > 0;

          return hasValue && isValidStatus;
        },
        defaultMessage(args: ValidationArguments): string {
          const context = args.object as any;
          if (!args.value || args.value.length === 0) {
            return 'Job Store Number is required.';
          }
          return context._validationStatus === 'invalid'
            ? 'Please choose a unique number.'
            : 'Invalid Job Store Number.';
        },
      },
    });
  };
}

export function EmployeeClassificationGroupValidator(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'employeeClassificationGroupValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          return value && value.length != 0 && value.every((item) => item.employeeGroup && item.classification);
        },
        defaultMessage(_args: ValidationArguments): string {
          return `At least one classification must be added and all fields filled.`;
        },
      },
    });
  };
}
