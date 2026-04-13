import Card from "../components/Card";
import PropTypes from 'prop-types';

export default function Projetos({ isEnglish, content }) {

    return (
        <section className="section-fade py-12 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-16 3xl:px-24">
            <div className="mx-auto w-full max-w-10xl">
                <Card isEnglish={isEnglish} content={content} />
            </div>
        </section>
    )
}

Projetos.propTypes = {
    isEnglish: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired,
};