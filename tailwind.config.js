/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
		'./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', // Include Flowbite


	],
	theme: {
    	extend: {
    		fontFamily: {
    			playfair: [
    				'Playfair Display'
    			],
    			poppins: [
    				'Poppins'
    			],
    			lora: [
    				'Lora',
    				'serif'
    			],
    			montserrat: [
    				'Montserrat',
    				'sans-serif'
    			]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			dgray: {
    				'50': '#f8f8f8',
    				'100': '#f0f0f0',
    				'200': '#dcdcdc',
    				'300': '#bdbdbd',
    				'400': '#989898',
    				'500': '#7c7c7c',
    				'600': '#656565',
    				'700': '#525252',
    				'800': '#464646',
    				'900': '#3d3d3d',
    				'950': '#292929'
    			},
    			elephant: {
    				'50': '#edfefe',
    				'100': '#d2fafb',
    				'200': '#aaf2f7',
    				'300': '#70e6f0',
    				'400': '#2fd2e1',
    				'500': '#13b5c7',
    				'600': '#1291a8',
    				'700': '#167488',
    				'800': '#1b5f6f',
    				'900': '#1b4f5e',
    				'950': '#0c3542'
    			},
    			elebtn: '#000aff',
    			backg: '#EFF2F4',
    			navitems: '#b0541e',
    			btnbg: '#edb970',
    			hero: '#F1EBDF',
    			features: '#072C27',
    			foot: '#F1EBDF',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [
		require("tailwindcss-animate"),
		require('flowbite/plugin'), // Include Flowbite plugin here


	],

}
