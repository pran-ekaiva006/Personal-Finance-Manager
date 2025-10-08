import dotenv from 'dotenv';
import dns from 'dns';

// Force DNS resolution to prefer IPv4. This is a common fix for
// ENETUNREACH errors in cloud environments like Render.
dns.setDefaultResultOrder('ipv4first');

dotenv.config();

import('./index.js');
