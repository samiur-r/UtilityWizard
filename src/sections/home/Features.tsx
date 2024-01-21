import {
  ClipboardIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Streamlined Billing",
    description:
      "Generate accurate bills effortlessly, track usage, and manage payments with ease.",
    icon: ClipboardIcon,
  },
  {
    name: "Secure Online Payments",
    description:
      "Accept payments securely through multiple gateways, ensuring a seamless customer experience.",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Robust Reporting",
    description:
      "Gain valuable insights with customizable reports on usage trends, payment history, and account status.",
    icon: ChartBarIcon,
  },
  {
    name: "Customizable Rate Structures",
    description:
      "Define and manage flexible rate structures to align with different utility types and usage patterns.",
    icon: DocumentTextIcon,
  },
  {
    name: "Automated Late Fee Management",
    description:
      "Effortlessly track and apply late fees consistently, ensuring timely payments and revenue collection.",
    icon: CalendarIcon,
  },
  {
    name: "User Role Management",
    description:
      "Assign specific permissions to different users, ensuring data security and controlled access.",
    icon: UserGroupIcon,
  },
];

const Features = () => {
  return (
    <div className="bg-gray-900 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Simplify Utility Management
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Take Control of Your Utility Bills
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Streamline billing, payments, reporting, and more with our
            comprehensive utility management platform.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
export default Features;
