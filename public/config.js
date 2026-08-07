const IS_SANDBOX = location.hostname.includes('streetsmarts');

window.SISG_CONFIG = Object.freeze({
  GAS_URL: IS_SANDBOX
    ? 'https://script.google.com/macros/s/AKfycbx6ICSTL8Uj1uvunwvGxOeoXYEsMQ95wCuA_G43vkWVOsK3A_82NUEuWbeWhWWzhH84/exec'
    : 'https://script.google.com/macros/s/AKfycbwmfQODe5NJGfq2bzywPFASTa6Ds4RHPSJ28OLSjH5_cmsgNeNhqhtHbv18YxNvjMJFSg/exec',
  API_KEY: 'company_cloud_tracker_2026',
  STUDENT_PAGE_URL: 'https://sisg-project.web.app/',
  TRAINER_EMAILS: ['leo@street-smart.sg', 'nash@street-smart.sg', 'adlina@street-smart.sg', 'eddy@street-smart.sg']
});

window.GAS_URL = window.SISG_CONFIG.GAS_URL;
window.API_KEY = window.SISG_CONFIG.API_KEY;

