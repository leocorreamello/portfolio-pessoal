import PropTypes from 'prop-types';

export default function Footer({ content }) {
    const currentYear = new Date().getFullYear();
    const { profile } = content;

    return (
        <footer aria-label='Site footer'>
            <div className="bg-neutral-900 text-white h-20 flex justify-center items-center">
                <p>Copyright © {currentYear} by {profile.name}. All rights reserved.</p>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    content: PropTypes.shape({
        profile: PropTypes.object.isRequired,
    }).isRequired,
};