import Image from "next/image";
const FOOTER_LINKS_DATA = [
  {
    rows: [
      {
        title: "Products",
        items: [
          {
            title: "AP Automation",
            href: "/",
          },
          {
            title: "Payments",
            href: "/",
          },
          {
            title: "Vendor Management",
            href: "/",
          },
          {
            title: "Integrations",
            href: "/",
          },
          {
            title: "Security",
            href: "/",
          },
          {
            title: "Pricing",
            href: "/",
          },
        ],
      },
    ],
  },
  {
    rows: [
      {
        title: "Features",
        items: [
          {
            title: "Invoice Capture & OCR",
            href: "/",
          },
          {
            title: "Approval Workflows",
            href: "/",
          },
          {
            title: "PO Matching",
            href: "/",
          },
          {
            title: "Payment Reconciliation",
            href: "/",
          },
          {
            title: "Role-based Controls",
            href: "/",
          },
          {
            title: "Compliance",
            href: "/",
          },
        ],
      },
    ],
  },
  {
    rows: [
      {
        title: "Solutions by Industry",
        items: [
          {
            title: "Marketplaces",
            href: "/",
          },
          {
            title: "Gig Economy",
            href: "/",
          },
          {
            title: "Insurance",
            href: "/",
          },
          {
            title: "Real Estate",
            href: "/",
          },
          {
            title: "Healthcare",
            href: "/",
          },
          {
            title: "Advertising",
            href: "/",
          },
        ],
      },
      {
        title: "Solutions by Team",
        items: [
          {
            title: "Controllers",
            href: "/",
          },
          {
            title: "Accountants",
            href: "/",
          },
          {
            title: "CFO's",
            href: "/",
          },
          {
            title: "Developers",
            href: "/",
          },
        ],
      },
    ],
  },

  {
    rows: [
      {
        title: "Resources",
        items: [
          {
            title: "All resources",
            href: "/",
          },
          {
            title: "Blog",
            href: "/",
          },
          {
            title: "Guides & Research Reports",
            href: "/",
          },
          {
            title: "Videos & Webinars",
            href: "/",
          },
          {
            title: "Tools & Calculators",
            href: "/",
          },
          {
            title: "Customers",
            href: "/",
          },
          {
            title: "Partners",
            href: "/",
          },
          {
            title: "Support",
            href: "/",
          },
        ],
      },
      {
        title: "Developers",
        items: [
          {
            title: "Guides",
            href: "/",
          },
          {
            title: "Recipes",
            href: "/",
          },
          {
            title: "API Reference",
            href: "/",
          },
          {
            title: "Changelog",
            href: "/",
          },
        ],
      },
    ],
  },

  {
    rows: [
      {
        title: "Company",
        items: [
          {
            title: "About",
            href: "/",
          },
          {
            title: "Careers",
            href: "/",
          },
          {
            title: "Press",
            href: "/",
          },
        ],
      },
      {
        title: "Legal",
        items: [
          {
            title: "Terms of Service",
            href: "/",
          },
          {
            title: "Privacy Policy",
            href: "/",
          },
          {
            title: "Data Processing Addendum",
            href: "/",
          },
        ],
      },
    ],
  },
];

const CLIENT_LOGOS_DATA = [
  {
    title: "garmentory",
    path: "/assets/logo-garmentory.svg",
    width: 138,
    height: 15,
  },
  {
    title: "glue",
    path: "/assets/logo-glue.svg",
    width: 61,
    height: 31,
  },
  {
    title: "mlspa",
    path: "/assets/logo-mlspa.svg",
    width: 96,
    height: 34,
  },
  {
    title: "prompt",
    path: "/assets/logo-prompt.svg",
    width: 80,
    height: 22,
  },
  {
    title: "remax",
    path: "/assets/logo-remax.svg",
    width: 96,
    height: 17,
  },
  {
    title: "ticketmaster",
    path: "/assets/logo-ticketmaster.svg",
    width: 125,
    height: 18,
  },
];

const INTEGRATIONS_DATA = [
  {
    icon: (
      <Image
        src='/assets/logo-netsuite.svg'
        alt='netsuite logo'
        width={103}
        height={35}
      />
    ),
    description: "Scale your enterprise business with Acme + NetSuite.",
    url: "/",
  },
  {
    icon: (
      <Image
        src='/assets/logo-sage.svg'
        alt='netsuite logo'
        width={82}
        height={46}
      />
    ),
    description: "Drive your business with Acme + Sage Intacct.",
    url: "/",
  },
  {
    icon: (
      <Image
        src='/assets/logo-qb.svg'
        alt='netsuite logo'
        width={60}
        height={60}
      />
    ),
    description: "Save time and money with a real time, two-way sync.",
    url: "/",
  },
  {
    icon: (
      <Image
        src='/assets/logo-xero.svg'
        alt='netsuite logo'
        width={60}
        height={60}
      />
    ),
    description: "Makes sending invoices and paying bills a breeze.",
    url: "/",
  },
];

export { FOOTER_LINKS_DATA, CLIENT_LOGOS_DATA, INTEGRATIONS_DATA };
