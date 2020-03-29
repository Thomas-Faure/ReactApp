import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import locale_en from './translations/en'
import locale_fr from './translations/fr'
const data = {
    'fr' : locale_fr,
    'en' : locale_en
};

/*
* Ce fichier permet de récuperer via Redux la langue souhaité pour la traduction
*
*/
function mapStateToProps(state) {
  const { lang } = state.language;
  return { locale: lang,  messages :data[lang] };
}

export default connect(mapStateToProps)(IntlProvider);