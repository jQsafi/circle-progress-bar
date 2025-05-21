const { chromium } = require( 'playwright' );
const path = require( 'path' );
const fs = require( 'fs' );

( async () => {
	// Create assets directory if it doesn't exist
	const assetsDir = path.join( __dirname, '..', 'assets' );
	if ( ! fs.existsSync( assetsDir ) ) {
		fs.mkdirSync( assetsDir, { recursive: true } );
	}

	// Launch browser
	const browser = await chromium.launch();
	const context = await browser.newContext( {
		viewport: { width: 1200, height: 800 },
	} );
	const page = await context.newPage();

	// Navigate to template file
	const htmlPath = path.join(
		__dirname,
		'..',
		'assets',
		'screenshot-template.html'
	);
	await page.goto( `file://${ htmlPath }` );

	// Define screenshot configurations
	const screenshots = [
		{
			id: 'screenshot-1',
			name: 'screenshot-1.png',
			size: { width: 800, height: 600 },
		},
		{
			id: 'screenshot-2',
			name: 'screenshot-2.png',
			size: { width: 800, height: 800 },
		},
		{
			id: 'screenshot-3',
			name: 'screenshot-3.png',
			size: { width: 1200, height: 600 },
		},
		{
			id: 'screenshot-4',
			name: 'screenshot-4.png',
			size: { width: 800, height: 600 },
		},
		{
			id: 'screenshot-5',
			name: 'screenshot-5.png',
			size: { width: 800, height: 600 },
		},
	];

	// Take screenshots
	for ( const config of screenshots ) {
		const element = await page.$( `#${ config.id }` );
		if ( element ) {
			await element.screenshot( {
				path: path.join( __dirname, '..', 'assets', config.name ),
				...config.size,
			} );
			// eslint-disable-next-line no-console
			console.log( `Generated ${ config.name }` );
		}
	}

	// Clean up
	await browser.close();
} )();
