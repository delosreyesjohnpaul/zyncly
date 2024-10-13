import { CloudRain, EarthLock, Library, Zap } from "lucide-react";

const features = [
  {
    name: "Sign up for free",
    description:
      "Sign up for free today and gain instant access to exclusive features and content. Enjoy seamless browsing, personalized recommendations, and more, all without any cost.",
    icon: CloudRain,
  },
  {
    name: "Balzing fast",
    description:
      "Fast performance that ensures seamless and lightning-quick browsing. Experience speed like never before, with instant response times and zero lag, even during peak usage hours.",
    icon: Zap,
  },
  {
    name: "Super secure with Nylas",
    description:
      "Nylas ensures secure communication with advanced encryption, strong authentication, and industry-standard compliance for data protection.",
    icon: EarthLock,
  },
  {
    name: "Easy to use",
    description:
      "An intuitive and easy-to-use scheduling tool that allows users to effortlessly plan, and manage your tasks and meetings ensuring optimal time management and seamless coordination across different activities.",
    icon: Library,
  },
];

export function Features() {
  return (
    <div className="py-24 ">
      <div className="max-w-2xl mx-auto lg:text-center">
        <h2 className="font-semibold leading-7 text-primary">Schedule Faster</h2>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Schedule meetings in minutes
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
        With Zyncly, scheduling meetings takes just minutes. 
        We streamline the process, making it quick and effortless to arrange your meetings. 
        Experience fast and simple scheduling, designed to save you time.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}