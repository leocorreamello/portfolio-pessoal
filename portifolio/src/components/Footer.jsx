import PropTypes from 'prop-types';

export default function Footer({ content }) {
    const currentYear = new Date().getFullYear();
    const { profile } = content;

    return (
        <footer aria-label='Site footer'>
            <div className="border-t border-borderSoft bg-backgroundDeep/85 backdrop-blur-sm text-textMuted h-20 flex justify-center items-center px-4 text-center">
                <p className='text-sm sm:text-base tracking-wide'>Copyright © {currentYear} by {profile.name}. All rights reserved.</p>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    content: PropTypes.shape({
        profile: PropTypes.object.isRequired,
    }).isRequired,
};