import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month } = request.body;

    const istProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await istProviderMonthAvailability.execute({
      provider_id,
      year,
      month,
    });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
