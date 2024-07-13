import NotFound from '@/components/NotFound';

export default function CustomNotFound() {
    return (
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
    );
}