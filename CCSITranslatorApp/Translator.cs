using System.Collections;
using CCSITranslatorApp.Utilities;
using Google.Api.Gax.ResourceNames;
using Google.Cloud.Translate.V3;
using Newtonsoft.Json;

namespace CCSITranslatorApp;

public interface ITranslator
{
    IEnumerable<CompatibleLanguages> TranslationLanguages();
    TranslationResponse TranslateText(TranslationRequest translationRequest);
}

public class Translator : ITranslator
{
    private readonly TranslationServiceClient _client;

    public Translator()
    {
        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "cssi-translator-0809cb225647.json");
        _client = TranslationServiceClient.Create();
    }
    public IEnumerable<CompatibleLanguages> TranslationLanguages()
    {
        
        GetSupportedLanguagesRequest supportedLanguagesRequest = new GetSupportedLanguagesRequest
        {
            ParentAsLocationName = new LocationName("cssi-translator", "global"),
        };
        
        var response = _client.GetSupportedLanguages(supportedLanguagesRequest).Languages.ToString();
        List<CompatibleLanguages> languages = JsonConvert.DeserializeObject<List<CompatibleLanguages>>(response);
        return languages;
    }

    public TranslationResponse TranslateText(TranslationRequest translationRequest)
    {
        TranslateTextRequest translateTextRequest = new TranslateTextRequest
        {
            Contents = { translationRequest.inputText },
            SourceLanguageCode = translationRequest.inputLanguage,
            TargetLanguageCode = translationRequest.outputLanguage,
            ParentAsLocationName = new LocationName("cssi-translator", "global")
        };
        var response = _client.TranslateText(translateTextRequest);
        
        var responseToString = JsonConvert.SerializeObject(response);
        TranslationResponse TranslatedTextResponse = JsonConvert.DeserializeObject<TranslationResponse>(responseToString);
        return TranslatedTextResponse;
    }
}
