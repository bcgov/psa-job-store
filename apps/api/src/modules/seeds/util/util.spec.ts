import { CommandBus } from '@nestjs/cqrs';
import { EventStoreDBClient } from '@eventstore/db-client';
import { applySeeds } from './util';

jest.mock('@nestjs/cqrs'); // Assuming CommandBus is from @nestjs/cqrs
jest.mock('@eventstore/db-client'); // Mock EventStoreDBClient and related constants

// Mock your other dependencies
jest.mock('../../modules/auth/auth.constants');
jest.mock('../../utils/validate-object.dto');

jest.mock('../../modules/event-store/utils/create-command-handler.util', () => ({
  handleEmpty: jest.fn((input) => input),
}));

describe('applySeeds', () => {
  let commandBusMock: jest.Mocked<CommandBus<any>>;
  let eventStoreMock: jest.Mocked<EventStoreDBClient>;
  let validateObjectMock: jest.Mock;

  beforeEach(() => {
    commandBusMock = new CommandBus({} as any) as any;
    eventStoreMock = new EventStoreDBClient({} as any) as any;
    validateObjectMock = jest.fn();

    (commandBusMock.execute as jest.Mock).mockResolvedValue(undefined);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (validateObjectMock as any).mockImplementation(() => {});

    // Default mock for eventStoreMock.readStream
    const mockIterator = {
      async *[Symbol.asyncIterator]() {
        yield await this.next();
      },
      next: jest.fn().mockResolvedValueOnce({ value: null }),
    };

    (eventStoreMock.readStream as jest.Mock).mockReturnValue(mockIterator);
  });

  it('should validate seeds for upsert', async () => {
    const seeds = { upsert: [{ id: '1', name: 'test' }], remove: [] };
    const validateInputMck = { mock: 'input' };
    await applySeeds(
      seeds,
      commandBusMock,
      eventStoreMock,
      validateInputMck,
      jest.fn(),
      jest.fn(),
      jest.fn(),
      'test',
      validateObjectMock,
    );

    expect(validateObjectMock).toHaveBeenCalledWith(seeds.upsert[0], validateInputMck);
  });

  it('should create a new command if stream does not exist', async () => {
    const seeds = { upsert: [{ id: '1', name: 'test' }], remove: [] };
    const mockIterator = {
      next: jest.fn().mockResolvedValueOnce({ value: null }),
    };

    (eventStoreMock.readStream as jest.Mock).mockReturnValue(mockIterator);

    const createCommandMock = jest.fn().mockImplementation(() => ({}));

    await applySeeds(
      seeds,
      commandBusMock,
      eventStoreMock,
      validateObjectMock,
      createCommandMock,
      jest.fn(),
      jest.fn(),
      'test',
    );

    expect(createCommandMock).toHaveBeenCalledWith(seeds.upsert[0], { created_by: expect.anything() });
    expect(commandBusMock.execute).toHaveBeenCalled();
  });

  it('should update command if stream exists', async () => {
    const seeds = { upsert: [{ id: '1', name: 'test' }], remove: [] };
    const mockIterator = {
      next: jest.fn().mockResolvedValueOnce({ value: {} }),
    };

    (eventStoreMock.readStream as jest.Mock).mockReturnValue(mockIterator);

    const updateCommandMock = jest.fn().mockImplementation(() => ({}));

    await applySeeds(
      seeds,
      commandBusMock,
      eventStoreMock,
      validateObjectMock,
      jest.fn(),
      updateCommandMock,
      jest.fn(),
      'test',
    );

    expect(updateCommandMock).toHaveBeenCalledWith(seeds.upsert[0], { created_by: expect.anything() });
    expect(commandBusMock.execute).toHaveBeenCalled();
  });

  it('should execute delete command for removal seeds', async () => {
    const seeds = { upsert: [], remove: [{ id: '1', name: 'test' }] };

    const deleteCommandMock = jest.fn().mockImplementation(() => ({}));

    await applySeeds(
      seeds,
      commandBusMock,
      eventStoreMock,
      validateObjectMock,
      jest.fn(),
      jest.fn(),
      deleteCommandMock,
      'test',
    );

    expect(deleteCommandMock).toHaveBeenCalledWith(seeds.remove[0], { created_by: expect.anything() });
    expect(commandBusMock.execute).toHaveBeenCalled();
  });
});
