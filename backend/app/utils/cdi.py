from typing import final

from app.cdi import Module, SingletonScope


@final
class UtilsModule(Module):
    @staticmethod
    def settings_provider():
        from .settings import Settings

        settings = Settings()

        return settings

    def configure(self):
        from .settings import Settings

        self.bind(
            Settings, scope=SingletonScope, to_provider=self.settings_provider
        )
