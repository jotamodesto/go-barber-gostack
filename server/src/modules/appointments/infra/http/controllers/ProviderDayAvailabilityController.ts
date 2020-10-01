import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.body;

    const istProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await istProviderDayAvailability.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;
