using System.Text.Json;
using CCSITranslatorApp.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CCSITranslatorApp.Controllers;

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
        var supportedLanguages = _translator.TranslationLanguages();
        return Content(JsonSerializer.Serialize(supportedLanguages));
    }

    [HttpPost]
    [Route("translate")]
    public IActionResult Translate(TranslationRequest translationRequest)
    {
        Console.WriteLine("REMOVE-ME POST");
        var translatedText = _translator.TranslateText(translationRequest);
        return Content(JsonSerializer.Serialize(translatedText));
    }
    
}