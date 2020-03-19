import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import locale_en from './translations/en'
import locale_fr from './translations/fr'
const data = {
    'fr' : locale_fr,
    'en' : locale_en
};

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
function mapStateToProps(state) {
  const { lang } = state.language;
  return { locale: lang,  messages :data[lang] };
}

export default connect(mapStateToProps)(IntlProvider);