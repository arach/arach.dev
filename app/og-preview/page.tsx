import { OgComponent } from '../../components/og/OgComponent';

type OgPreviewPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function OgPreviewPage({ searchParams }: OgPreviewPageProps) {
    const params = await searchParams;
    const title = (params?.title as string) || '[ARACH.DEV]';
    const subtitle = (params?.subtitle as string) || 'my dev projects and notes';
    const path = (params?.path as string) || '/';
    const mode = (params?.mode as 'dark' | 'light') || 'dark';
    const format = (params?.format as 'standard' | 'square') || 'standard';

    return (
        <div style={{ 
            width: '1200px', 
            height: format === 'square' ? '1200px' : '630px', 
            margin: '50px auto', 
            border: '2px solid #333' 
        }}>
            <OgComponent
                title={title}
                subtitle={subtitle}
                path={path}
                mode={mode}
                format={format}
            />
        </div>
    );
}