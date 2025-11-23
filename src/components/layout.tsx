import type { PropsWithChildren } from "react";
import Header from "./ui/header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-background min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-linear-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]" />

      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="animate-fade-in">{children}</div>
      </main>
      <footer className="border-t backdrop-blur-sm py-8 mt-16 supports-backdrop-filter:bg-background/60 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm animate-fade-in animate-delay-500">
            Made with ❤️ by{" "}
            <span className="font-semibold text-foreground">Ashaz Shaikh</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout