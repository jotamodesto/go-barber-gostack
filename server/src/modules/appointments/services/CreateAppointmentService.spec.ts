import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentsService: CreateAppointmentsService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentsService = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 9, 2, 12).getTime());

    const appointment = await createAppointmentsService.execute({
      date: new Date(2020, 9, 2, 13),
      provider_id: '123456',
      user_id: '654321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments with the same date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 9, 2, 12).getTime());

    const appointmentDate = new Date(2020, 9, 2, 13);

    await createAppointmentsService.execute({
      date: appointmentDate,
      provider_id: '123456',
      user_id: '654321',
    });

    await expect(
      createAppointmentsService.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 9, 2, 12).getTime());

    await expect(
      createAppointmentsService.execute({
        date: new Date(2020, 9, 2, 11),
        provider_id: '123456',
        user_id: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with logged user as provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 9, 2, 12).getTime());

    await expect(
      createAppointmentsService.execute({
        date: new Date(2020, 9, 2, 13),
        provider_id: '123456',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside working hours', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 9, 2, 12).getTime());

    await expect(
      createAppointmentsService.execute({
        date: new Date(2020, 9, 2, 7),
        provider_id: '123456',
        user_id: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentsService.execute({
        date: new Date(2020, 9, 2, 18),
        provider_id: '123456',
        user_id: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
