using System.Text.Json;
using CSSITranslatorApp.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CSSITranslatorApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TranslatorController : ControllerBase
{
    private readonly ILogger<TranslatorController> _logger;
    private readonly ITranslator _translator;
    
    public TranslatorController(ILogger<TranslatorController> logger, ITranslator translator)
    {
        _logger = logger;
        _translator = translator;
    }

    [HttpGet]
    [Route("languages")]
    public IActionResult Languages()
    {
        _logger.LogInformation("Getting supported languages from Google Cloud Translate V3");
        var supportedLanguages = _translator.TranslationLanguages();
        return Content(JsonSerializer.Serialize(supportedLanguages));
    }

    [HttpPost]
    [Route("translate")]
    public IActionResult Translate(TranslationRequest translationRequest)
    {
        _logger.LogInformation("Sending translation request to Google Cloud Translate V3");
        var translatedText = _translator.TranslateText(translationRequest);
        return Content(JsonSerializer.Serialize(translatedText));
    }
    
}