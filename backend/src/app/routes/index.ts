import { Router } from 'express';
import { roleRouter } from '../modules/roles/roles.routes';
import { deptRouter } from '../modules/department/dept.routes';
import { staffRouter } from '../modules/staff/staff.routes';
import { authRouter } from '../modules/auth/auth.routes';
import { leadSourcesRouter } from '../modules/leadSource/lead.router';
import { leadRouter } from '../modules/lead/lead.routes';
import { queryRouter } from '../modules/query/query.routes';
import { followupRouter } from '../modules/followUp/followUp.routes';
import { supplierRouter } from '../modules/supplier/supplier.routes';
import { hotelRouter } from '../modules/hotel/hotel.routes';
import { sightSeeingRouter } from '../modules/sightseeing/sightseeing.routes';
import { rateRouter } from '../modules/sirates/rates.routes';
import { transportRouter } from '../modules/transport/transport.routes';
import { driverRouter } from '../modules/driver/driver.routes';
import { guideRouter } from '../modules/guides/guide.routes';
import { transportRatesRouter } from '../modules/transport-rates/t-rates.routes';
import { visaRouter } from '../modules/visa/visa.routes';
import { itenaryRouter } from '../modules/itenary/itenary.routes';
import { areaRouter } from '../modules/area/area.routes';
import { companyProfileRouter } from '../modules/company-profile/company.routes';
import { termsConditionsRouter } from '../modules/T&C/t&c.routes';
import { emailTemplateRouter } from '../modules/emailTemplate/email.routes';
const router = Router();

const moduleRoutes = [
  { path: '/roles', route: roleRouter },
  { path: '/departments', route: deptRouter },
  { path: '/staff', route: staffRouter },
  { path: '/auth', route: authRouter },
  { path: '/leads', route: leadRouter },
  { path: '/queries', route: queryRouter },
  { path: '/followups', route: followupRouter },
  { path: '/suppliers', route: supplierRouter },
  { path: '/hotels', route: hotelRouter },
  { path: '/sightseeings', route: sightSeeingRouter },
  { path: '/sightseeing-rates', route: rateRouter },
  { path: '/transports', route: transportRouter },
  { path: '/drivers', route: driverRouter },
  { path: '/guides', route: guideRouter },
  { path: '/transport-routes', route: transportRatesRouter },
  { path: '/visas', route: visaRouter },
  { path: '/itineraries', route: itenaryRouter },
  { path: '/areas', route: areaRouter },
  { path: '/restaurants', route: areaRouter },
  { path: '/company-profile', route: companyProfileRouter },
  { path: '/terms-conditions', route: termsConditionsRouter },
  { path: '/email-templates', route: emailTemplateRouter },
  { path: '/lead-sources', route: leadSourcesRouter },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
