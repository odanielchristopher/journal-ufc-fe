import { FacebookIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { Link } from 'react-router';

import { routes } from '@app/Router/routes';
import { InstagramIcon } from '@views/assets/InstragramIcon';
import { YoutubeIcon } from '@views/assets/YoutubeIcon';
import { Button } from '@views/components/ui/Button';

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={className}>
      <FooterContent />
    </footer>
  );
}

export function FooterContent() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col">
      <div className="flex flex-wrap items-center justify-start gap-10 md:justify-around md:gap-8">
        <UfcSection />

        <ContactsSection />
      </div>

      <Copyright className="text-muted border-muted-foreground mt-8 flex items-center justify-center border-t pt-8 text-sm" />
    </div>
  );
}

export function UfcSection() {
  return (
    <div className="flex flex-col items-start gap-6">
      <Link to={routes.home}>
        <div className="flex items-center justify-center gap-4">
          <span className="flex size-13 items-center justify-center rounded-md bg-teal-700 text-xl font-bold text-white">
            UFC
          </span>

          <strong className="text-lg font-bold">Jornal UFC</strong>
        </div>
      </Link>

      <p className="text-muted w-70">
        Campus de excelência em tecnologia e inovação no coração do Ceará.
      </p>

      <div className="flex items-center gap-3">
        <Button type="button" className="size-10 bg-gray-700">
          <InstagramIcon className="fill-white" />
        </Button>
        <Button type="button" className="size-10 bg-gray-700">
          <YoutubeIcon className="size-5 fill-white" />
        </Button>
        <Button type="button" className="size-10 bg-gray-700">
          <FacebookIcon className="size-5 fill-white stroke-1" />
        </Button>
      </div>
    </div>
  );
}

export function ContactsSection() {
  return (
    <div className="flex flex-col items-start gap-6">
      <strong className="text-lg">Contato</strong>

      <div className="flex gap-4">
        <MapPinIcon className="text-teal-500" />

        <address className="text-muted w-70 not-italic">
          Av. José de Freitas Queiroz, 5003 Quixadá - CE
        </address>
      </div>

      <div className="flex gap-4">
        <PhoneIcon className="text-teal-500" />

        <span className="text-muted w-70 not-italic">(88) 3445-9000</span>
      </div>

      <div className="flex gap-4">
        <MailIcon className="text-teal-500" />

        <span className="text-muted w-70 not-italic">contato@ufc.br</span>
      </div>
    </div>
  );
}

export function Copyright({ className }: { className?: string }) {
  return (
    <span className={className}>
      © 2025 Universidade Federal do Ceará - Campus Quixadá. Todos os direitos
      reservados.
    </span>
  );
}
