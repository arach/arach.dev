import NotFound from '@/components/NotFound';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: '404: Page not found | arach.dev' },
};

export default function CustomNotFound() {
    return (
        <div data-pulse-not-found="true">
          <NotFound
            domain="arach.dev"
            siteStructure={[
                'index.html',
                'about/',
                'projects/',
                'notes/'
            ]}
            buttonText="Return to arach.dev"
            buttonLink="/"
          />
        </div>
    );
}
