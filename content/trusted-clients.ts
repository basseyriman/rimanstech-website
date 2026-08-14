export interface TrustedClient {
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
}

export const trustedClients: TrustedClient[] = [
  {
    name: "Henco Homes",
    logo: "/brand/clients/henco-homes.svg",
    logoWidth: 172,
    logoHeight: 32,
  },
  {
    name: "Adrielle",
    logo: "/brand/clients/adrielle.svg",
    logoWidth: 132,
    logoHeight: 36,
  },
  {
    name: "Waffi Content Studio",
    logo: "/brand/clients/waffi-content-studio.svg",
    logoWidth: 210,
    logoHeight: 36,
  },
  {
    name: "Waffi Enterprise Limited",
    logo: "/brand/clients/waffi-enterprise.svg",
    logoWidth: 248,
    logoHeight: 40,
  },
];
