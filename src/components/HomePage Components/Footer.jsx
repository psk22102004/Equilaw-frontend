import { GitHubLogoIcon, InstagramLogoIcon, Link1Icon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import React from 'react';

function Footer(props) {
    const currentYear = new Date().getFullYear();
    
    const socialLinks = [
        { name: 'LinkedIn', url: '#', icon:<LinkedInLogoIcon /> },
        { name: 'Twitter', url: '#', icon: <TwitterLogoIcon/>},
        { name: 'GitHub', url: '#', icon: <GitHubLogoIcon/> },
        { name: 'Instagram', url: '#', icon: <InstagramLogoIcon/> }
    ];
    
    const quickLinks = [
        { name: 'About Us', url: '#' },
        { name: 'Services', url: '#' },
        { name: 'Projects', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Support', url: '#' }
    ];
    
    const legalLinks = [
        { name: 'Privacy Policy', url: '#' },
        { name: 'Terms of Service', url: '#' },
        { name: 'Cookie Policy', url: '#' },
        { name: 'GDPR', url: '#' }
    ];

    return (
        <div className='w-full'>
            {/* Main Footer Content */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
                {/* Contact Section */}
                <div className='flex flex-col gap-6'>
                    <div className='relative'>
                        <h1 className="text-3xl font-bold font-playfair text-white mb-2 relative">
                            {props.title}
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-gray-400 to-white/30 rounded-full"></div>
                        </h1>
                    </div>
                    
                    <div className='space-y-4'>
                        <div className='flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300'>
                            <a 
                                href={`mailto:${props.mail}`} 
                                className='font-poppins text-lg font-medium text-white hover:text-blue-300 transition-colors duration-300 underline decoration-transparent hover:decoration-blue-300'
                            >
                                {props.mail}
                            </a>
                        </div>
                        
                        <div className='flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300'>
                            
                            <a 
                                href={`tel:${props.no}`}
                                className='text-lg font-medium text-white hover:text-green-300 transition-colors duration-300'
                            >
                                {props.no}
                            </a>
                        </div>
                        
                        <div className='flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300'>
                            
                            <p className='text-lg font-medium text-white'>
                                Mumbai, Maharashtra, India
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className='flex flex-col gap-6'>
                    <h2 className="text-2xl font-bold text-white relative">
                        Quick Links
                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-gray-400 to-white/30 rounded-full"></div>
                    </h2>
                    <div className='grid grid-cols-2 gap-3'>
                        {quickLinks.map((link, index) => (
                            <a 
                                key={index}
                                href={link.url}
                                className='text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm font-medium'
                            >
                                • {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Services */}
                <div className='flex flex-col gap-6'>
                    <h2 className="text-2xl font-bold text-white relative">
                        Our Services
                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-gray-400 to-white/30 rounded-full"></div>
                    </h2>
                    <div className='space-y-3'>
                        <div className='text-gray-300 text-sm font-medium'>• AI Integration Solutions</div>
                        <div className='text-gray-300 text-sm font-medium'>• Legal Technology Consulting</div>
                        <div className='text-gray-300 text-sm font-medium'>• Data Analytics & Insights</div>
                        <div className='text-gray-300 text-sm font-medium'>• Mentorship Programs</div>
                        <div className='text-gray-300 text-sm font-medium'>• Custom Development</div>
                        <div className='text-gray-300 text-sm font-medium'>• Training & Workshops</div>
                    </div>
                </div>

                {/* Newsletter & Social */}
                <div className='flex flex-col gap-6'>
                    <h2 className="text-2xl font-bold text-white relative">
                        Stay Connected
                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-gray-400 to-white/30rounded-full"></div>
                    </h2>
                    
                    
                    
                    {/* Social Links */}
                    <div className='space-y-3'>
                   
                        <div className='grid grid-cols-2 gap-3'>
                            {socialLinks.map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.url}
                                    className='flex items-center gap-2 text-gray-300 hover:text-white hover:scale-105 transition-all duration-300 text-sm'
                                >
                                    <span className='text-lg'>{social.icon}</span>
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

            {/* Bottom Footer */}
            <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
                <div className='flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm'>
                    <p>© {currentYear} Equilaw All rights reserved.</p>
                   
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}

export default Footer;