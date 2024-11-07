// mock-incident.resolver.ts
import { Args, Field, ID, InputType, Int, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { CrmService } from './crm.service';
import { IncidentCreateUpdateInput } from './models/incident-create.input';

@ObjectType()
class Status {
  @Field(() => ID)
  id: string;

  @Field()
  lookupName: string;
}

@ObjectType()
class StatusWithType {
  @Field(() => Status)
  status: Status;
}

@ObjectType()
class Category {
  @Field()
  lookupName: string;
}

@ObjectType()
export class MockIncident {
  @Field(() => ID)
  id: string;

  @Field()
  lookupName: string;

  @Field(() => StatusWithType)
  statusWithType: StatusWithType;

  @Field(() => Category)
  category: Category;
}

@InputType()
export class MockIncidentFilterInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  lookupName?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  category?: string;
}

// Update types:

@InputType()
class PrimaryContactInput {
  @Field(() => Int)
  id: number;
}

@InputType()
class StaffGroupInput {
  @Field()
  lookupName: string;
}

@InputType()
class AssignedToInput {
  @Field(() => StaffGroupInput)
  staffGroup: StaffGroupInput;
}

@InputType()
class CategoryInput {
  @Field(() => Int)
  id: number;
}

@InputType()
class StatusInput {
  @Field(() => Int)
  id: number;
}

@InputType()
class StatusWithTypeInput {
  @Field(() => StatusInput)
  status: StatusInput;
}

@InputType()
class SeverityInput {
  @Field()
  lookupName: string;
}

@InputType()
class ThreadContactInput {
  @Field(() => Int)
  id: number;
}

@InputType()
class ThreadChannelInput {
  @Field(() => Int)
  id: number;
}

@InputType()
class ThreadContentTypeInput {
  @Field(() => Int)
  id: number;
}

@InputType()
class ThreadEntryTypeInput {
  @Field(() => Int)
  id: number;
}

@InputType()
class ThreadInput {
  @Field(() => ThreadContactInput, { nullable: true })
  contact?: ThreadContactInput;

  @Field(() => ThreadChannelInput)
  channel: ThreadChannelInput;

  @Field(() => ThreadContentTypeInput)
  contentType: ThreadContentTypeInput;

  @Field(() => ThreadEntryTypeInput)
  entryType: ThreadEntryTypeInput;

  @Field()
  text: string;
}

@InputType()
class FileAttachmentInput {
  @Field()
  name: string;

  @Field()
  fileName: string;

  @Field()
  contentType: string;

  @Field()
  data: string;
}

@InputType()
export class UpdateMockIncidentInput {
  @Field({ nullable: true })
  subject?: string;

  @Field(() => PrimaryContactInput, { nullable: true })
  primaryContact?: PrimaryContactInput;

  @Field(() => AssignedToInput, { nullable: true })
  assignedTo?: AssignedToInput;

  @Field(() => CategoryInput, { nullable: true })
  category?: CategoryInput;

  @Field(() => StatusWithTypeInput, { nullable: true })
  statusWithType?: StatusWithTypeInput;

  @Field(() => SeverityInput, { nullable: true })
  severity?: SeverityInput;

  @Field(() => [ThreadInput], { nullable: true })
  threads?: ThreadInput[];

  @Field(() => [FileAttachmentInput], { nullable: true })
  fileAttachments?: FileAttachmentInput[];
}

@Resolver(() => MockIncident)
export class MockIncidentResolver {
  constructor(
    private readonly mockIncidentService: CrmService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => MockIncident, { nullable: true })
  async updateMockIncident(
    @Args('id', { type: () => ID }) id: string,
    @Args('data', { type: () => UpdateMockIncidentInput }) data: UpdateMockIncidentInput, // You might want to create a proper input type
  ) {
    console.log('updateMockIncident called with id:', id, 'data:', data);
    return this.mockIncidentService.updateMockIncident(parseInt(id), data as IncidentCreateUpdateInput);
  }

  @Mutation(() => MockIncident, { nullable: true })
  async updateMockIncidentByPositionRequestId(
    @Args('id', { type: () => ID }) id: string,
    @Args('data', { type: () => UpdateMockIncidentInput }) data: UpdateMockIncidentInput, // You might want to create a proper input type
  ) {
    // get position request, retrieve crm_id, call updateMockIncident
    const pr = await this.prisma.positionRequest.findUnique({ where: { id: parseInt(id) } });
    console.log('updateMockIncident called with id:', id, 'data:', data);
    return this.mockIncidentService.updateMockIncident(pr.crm_id, data as IncidentCreateUpdateInput);
  }

  @Mutation(() => Boolean)
  async resetMockCRMData() {
    return this.mockIncidentService.resetMockData();
  }

  // @Query(() => [MockIncident], { name: 'mockIncidents' })
  // async getMockIncidents(@Args('filter', { nullable: true }) filter?: MockIncidentFilterInput) {
  //   return this.mockIncidentService.getAllIncidents(filter);
  // }

  // @Query(() => MockIncident, { name: 'mockIncident', nullable: true })
  // async getMockIncident(@Args('id', { type: () => ID }) id: string) {
  //   return this.mockIncidentService.getIncidentById(id);
  // }

  // @Mutation(() => MockIncident)
  // async createMockIncident(
  //   @Args('data') data: any, // You might want to create a proper input type
  // ) {
  //   return this.mockIncidentService.createIncident(data);
  // }

  // @Mutation(() => Boolean)
  // async deleteMockIncident(@Args('id', { type: () => ID }) id: string) {
  //   return this.mockIncidentService.deleteIncident(id);
  // }
}
