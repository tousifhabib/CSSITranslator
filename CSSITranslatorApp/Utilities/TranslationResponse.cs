using Google.Cloud.Translate.V3;

namespace CSSITranslatorApp.Utilities;

public class TranslationResponse
{
    public List<Translation> Translations { get; set; }
}

public class Translation
{ 
    public string TranslatedText { get; set; }
}