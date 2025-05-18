import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ColorPicker,
	TextControl,
	SelectControl,
} from '@wordpress/components';

registerBlockType( 'circle-progress-bar/progress', {
	title: 'Circle Progress Bar',
	icon: 'chart-pie',
	category: 'widgets',
	description: 'A customizable circle progress bar with animation options.',
	keywords: [ 'progress', 'circle', 'animation' ],
	supports: { html: false },
	attributes: {
		percentage: { type: 'number', default: 75 },
		size: { type: 'number', default: 100 },
		strokeColor: { type: 'string', default: '#00aaff' },
		bgColor: { type: 'string', default: '#e6e6e6' },
		text: { type: 'string', default: 'Progress' },
		animationSpeed: { type: 'number', default: 1 },
		useShadow: { type: 'boolean', default: false },
		useGradient: { type: 'boolean', default: false },
		strokeWidth: { type: 'number', default: 10 },
		fontSize: { type: 'number', default: 20 },
		fontColor: { type: 'string', default: '#333' },
	},

	edit( { attributes, setAttributes } ) {
		const {
			percentage,
			size,
			strokeColor,
			bgColor,
			text,
			animationSpeed,
			useShadow,
			useGradient,
			strokeWidth,
			fontSize,
			fontColor,
		} = attributes;

		const radius = size / 2;
		const normalizedRadius = radius - strokeWidth / 2;
		const circumference = normalizedRadius * 2 * Math.PI;
		const strokeDashoffset =
			circumference - ( percentage / 100 ) * circumference;
		const gradientId =
			'grad-' + Math.random().toString( 36 ).substring( 2, 8 );

		const renderColorPicker = ( label, color, onChange ) => (
			<div style={ { marginBottom: '16px' } }>
				<div className="components-base-control__field">
					<span className="components-base-control__label">
						{ label }
					</span>
					<ColorPicker
						color={ color }
						onChangeComplete={ ( val ) => onChange( val.hex ) }
						disableAlpha
					/>
				</div>
			</div>
		);

		return (
			<>
				<InspectorControls>
					<PanelBody title="Settings">
						<RangeControl
							label="Progress (%)"
							value={ percentage }
							onChange={ ( val ) =>
								setAttributes( { percentage: val } )
							}
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							label="Size (px)"
							value={ size }
							onChange={ ( val ) =>
								setAttributes( { size: val } )
							}
							min={ 50 }
							max={ 300 }
						/>
						<RangeControl
							label="Stroke Width"
							value={ strokeWidth }
							onChange={ ( val ) =>
								setAttributes( { strokeWidth: val } )
							}
							min={ 1 }
							max={ 30 }
						/>
						<RangeControl
							label="Font Size"
							value={ fontSize }
							onChange={ ( val ) =>
								setAttributes( { fontSize: val } )
							}
							min={ 10 }
							max={ 50 }
						/>
						<RangeControl
							label="Animation Speed (sec)"
							value={ animationSpeed }
							onChange={ ( val ) =>
								setAttributes( { animationSpeed: val } )
							}
							min={ 0.1 }
							max={ 5 }
							step={ 0.1 }
						/>
						<TextControl
							label="Custom Text"
							value={ text }
							onChange={ ( val ) =>
								setAttributes( { text: val } )
							}
						/>
						{ renderColorPicker(
							'Stroke Color',
							strokeColor,
							( val ) => setAttributes( { strokeColor: val } )
						) }
						{ renderColorPicker(
							'Background Color',
							bgColor,
							( val ) => setAttributes( { bgColor: val } )
						) }
						{ renderColorPicker( 'Font Color', fontColor, ( val ) =>
							setAttributes( { fontColor: val } )
						) }
						<SelectControl
							label="Use Gradient?"
							value={ useGradient ? 'yes' : 'no' }
							options={ [
								{ label: 'No', value: 'no' },
								{ label: 'Yes', value: 'yes' },
							] }
							onChange={ ( val ) =>
								setAttributes( { useGradient: val === 'yes' } )
							}
						/>
						<SelectControl
							label="Use Shadow?"
							value={ useShadow ? 'yes' : 'no' }
							options={ [
								{ label: 'No', value: 'no' },
								{ label: 'Yes', value: 'yes' },
							] }
							onChange={ ( val ) =>
								setAttributes( { useShadow: val === 'yes' } )
							}
						/>
					</PanelBody>
				</InspectorControls>

				<svg
					height={ size }
					width={ size }
					style={ { display: 'block', margin: 'auto' } }
				>
					{ useGradient && (
						<defs>
							<linearGradient
								id={ gradientId }
								x1="0%"
								y1="0%"
								x2="100%"
								y2="100%"
							>
								<stop offset="0%" stopColor="#00aaff" />
								<stop offset="100%" stopColor={ strokeColor } />
							</linearGradient>
						</defs>
					) }
					<circle
						stroke={ bgColor }
						fill="transparent"
						strokeWidth={ strokeWidth }
						r={ normalizedRadius }
						cx={ radius }
						cy={ radius }
					/>
					<circle
						stroke={
							useGradient ? `url(#${ gradientId })` : strokeColor
						}
						fill="transparent"
						strokeWidth={ strokeWidth }
						strokeDasharray={ `${ circumference } ${ circumference }` }
						strokeDashoffset={ strokeDashoffset }
						strokeLinecap="round"
						r={ normalizedRadius }
						cx={ radius }
						cy={ radius }
						style={ {
							transition: `stroke-dashoffset ${ animationSpeed }s`,
							filter: useShadow
								? 'drop-shadow(0 0 5px rgba(0,0,0,0.5))'
								: 'none',
						} }
					/>
					<text
						x="50%"
						y="50%"
						textAnchor="middle"
						dy=".3em"
						fontSize={ fontSize }
						fill={ fontColor }
					>
						{ text }
					</text>
				</svg>
			</>
		);
	},

	save( { attributes } ) {
		const {
			percentage,
			size,
			strokeColor,
			bgColor,
			text,
			useShadow,
			useGradient,
			strokeWidth,
			fontSize,
			fontColor,
		} = attributes;

		const radius = size / 2;
		const normalizedRadius = radius - strokeWidth / 2;
		const circumference = normalizedRadius * 2 * Math.PI;
		const strokeDashoffset =
			circumference - ( percentage / 100 ) * circumference;
		const gradientId = 'grad-static';

		return (
			<svg
				height={ size }
				width={ size }
				style={ { display: 'block', margin: 'auto' } }
			>
				{ useGradient && (
					<defs>
						<linearGradient
							id={ gradientId }
							x1="0%"
							y1="0%"
							x2="100%"
							y2="100%"
						>
							<stop offset="0%" stopColor="#00aaff" />
							<stop offset="100%" stopColor={ strokeColor } />
						</linearGradient>
					</defs>
				) }
				<circle
					stroke={ bgColor }
					fill="transparent"
					strokeWidth={ strokeWidth }
					r={ normalizedRadius }
					cx={ radius }
					cy={ radius }
				/>
				<circle
					stroke={
						useGradient ? `url(#${ gradientId })` : strokeColor
					}
					fill="transparent"
					strokeWidth={ strokeWidth }
					strokeDasharray={ `${ circumference } ${ circumference }` }
					strokeDashoffset={ strokeDashoffset }
					strokeLinecap="round"
					r={ normalizedRadius }
					cx={ radius }
					cy={ radius }
					style={ {
						filter: useShadow
							? 'drop-shadow(0 0 5px rgba(0,0,0,0.5))'
							: 'none',
					} }
				/>
				<text
					x="50%"
					y="50%"
					textAnchor="middle"
					dy=".3em"
					fontSize={ fontSize }
					fill={ fontColor }
				>
					{ text }
				</text>
			</svg>
		);
	},
} );
