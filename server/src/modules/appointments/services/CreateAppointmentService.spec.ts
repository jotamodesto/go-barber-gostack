import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentsService = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentsService.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments with the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentsService = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 8, 22, 0);

    await createAppointmentsService.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    expect(
      createAppointmentsService.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
