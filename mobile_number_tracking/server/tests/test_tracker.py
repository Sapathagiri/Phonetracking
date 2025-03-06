import pytest
from src.tracker import track_ui

def test_valid_phone_number(capsys):
    track_ui("+14155552671")
    captured = capsys.readouterr()
    assert "Phone Number" in captured.out
    assert "Location" in captured.out

def test_invalid_phone_number(capsys):
    track_ui("12345")
    captured = capsys.readouterr()
    assert "Error" in captured.out
