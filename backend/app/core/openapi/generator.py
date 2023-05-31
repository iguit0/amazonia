def generate_error_table():
    from enum import Enum
    from typing import Any, Dict

    from pydantic import BaseModel, Field

    class ErrorGroup(str, Enum):
        GENERAL = "General"

    class ErrorInfo(BaseModel):
        code: int = Field(...)
        status_code: int = Field(ge=100, le=599)
        group: ErrorGroup = Field(...)
        description: str = Field(...)
        response_example: Dict[str, Any] = Field(...)

    return (
        ErrorInfo(
            code=400,
            status_code=400,
            group=ErrorGroup.GENERAL,
            description="Invalid request",
            response_example={},
        ),
        ErrorInfo(
            code=404,
            status_code=404,
            group=ErrorGroup.GENERAL,
            description="Not found",
            response_example={},
        ),
        ErrorInfo(
            code=422,
            status_code=422,
            group=ErrorGroup.GENERAL,
            description="Validation error",
            response_example={},
        ),
        ErrorInfo(
            code=500,
            status_code=500,
            group=ErrorGroup.GENERAL,
            description="Internal error",
            response_example={},
        ),
    )


def generate_description() -> str:
    """Generate OpenAPI description with error table"""
    from importlib.resources import files
    from json import dumps

    from pygments import highlight
    from pygments.formatters import HtmlFormatter
    from pygments.lexers import JsonLexer

    template = (files(__package__) / "openapi_description.md").read_text(
        "utf-8"
    )

    lexer = JsonLexer()
    formatter = HtmlFormatter(
        lineseparator="<br>",
        noclasses=True,
        style="default",
        prestyles="font-family: monospace; color: black; border: 0; background-color: transparent",
        cssclass="",
        cssstyles="color: black; background-color: transparent",
    )

    error_table = []

    for error_info in sorted(generate_error_table(), key=lambda x: x.code):
        error_code = dumps(
            error_info.response_example, indent=4, ensure_ascii=False
        )

        md = highlight(error_code, lexer=lexer, formatter=formatter).replace(
            "\n", ""
        )

        error_line = "|".join(
            (
                "",
                f'<a name="error-{error_info.code}"></a>{error_info.code}',
                error_info.group.value,
                error_info.description,
                str(error_info.status_code),
                md,
            )
        )

        error_table.append(error_line)

    return template.format(error_table="\n".join(error_table))
