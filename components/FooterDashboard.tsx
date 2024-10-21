// FooterDashboard.tsx
import { Card } from "@/components/ui/card";

const FooterDashboard = () => {
  return (
    <Card className="py-4 mt-6">
      <div className="container mx-auto text-center">
        <p className="text-sm px-6">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://www.citeutcubamba.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:underline-offset-2"
          >
            CITE Utcubamba Amazonas
          </a>
        </p>
      </div>
    </Card>
  );
};

export default FooterDashboard;
