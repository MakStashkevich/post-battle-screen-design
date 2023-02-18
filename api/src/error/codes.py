def _code_id(i: int) -> int:
    start_point = 1000
    range_point = 100
    return start_point + range_point * i


class ErrorCodes:
    DEFAULT = _code_id(0)
    SYSTEM = _code_id(1)
