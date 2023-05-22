import os
from threading import Lock
from typing import Any, Optional, Type, TypeVar, Union, final

import lazy_object_proxy
from opyoid import Injector as RealInjector
from opyoid import Module, Provider, SingletonScope  # noqa

T = TypeVar("T", bound=Any)


@final
class Injector:
    __slots__ = ()

    _injector: Optional[RealInjector] = None
    _injector_mutex = Lock()

    @staticmethod
    def _before_injector_created() -> None:
        from dotenv import load_dotenv

        load_dotenv()

    @staticmethod
    def _after_injector_created() -> None:
        ...

    @classmethod
    def _create_injector(cls) -> RealInjector:
        from .api.cdi import FastAPIModule
        from .utils.cdi import UtilsModule

        modules = (
            FastAPIModule,
            UtilsModule,
        )

        cls._before_injector_created()

        injector = RealInjector(modules)  # type: ignore[arg-type]

        cls._after_injector_created()

        return injector

    @classmethod
    def _at_fork_reinit(cls):  # pragma: no cover
        cls._injector = None
        cls._injector_mutex = Lock()

    @classmethod
    def _get_instance(cls) -> RealInjector:
        if (injector := cls._injector) is None:
            with cls._injector_mutex:
                if (injector := cls._injector) is None:
                    os.register_at_fork(after_in_child=cls._at_fork_reinit)
                    cls._injector = injector = cls._create_injector()
        return injector

    @classmethod
    def inject(
        cls, target_type: Union[Type[T], str], *, named: Optional[str] = None
    ) -> T:
        injector = cls._get_instance()
        return injector.inject(target_type=target_type, named=named)  # type: ignore[arg-type]

    @classmethod
    def lazy_inject(
        cls, target_type: Union[Type[T], str], *, named: Optional[str] = None
    ) -> T:
        def _lazy_inject():
            return cls.inject(target_type, named=named)

        return lazy_object_proxy.Proxy(_lazy_inject)
