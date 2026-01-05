import React from 'react';

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/i.ahmadzakwan/',
    iconClass: 'fab fa-instagram',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmad-zakwan-83878331b/',
    iconClass: 'fab fa-linkedin',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/i-ahmadzakwan',
    iconClass: 'fab fa-github',
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 glass-card rounded-none border-t border-white/20 py-5 px-4 z-40">
      <div className="text-center">
        <p className="text-muted-foreground mb-3">Connect with me:</p>
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-2xl transition-all duration-300 hover:text-foreground hover:scale-130 hover:rotate-10"
              aria-label={link.name}
              style={{
                transform: 'scale(1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.3) rotate(10deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <i className={link.iconClass}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
