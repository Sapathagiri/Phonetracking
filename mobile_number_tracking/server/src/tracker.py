# Import necessary libraries
from geopy.geocoders import Nominatim  # For geocoding and reverse geocoding
from phonenumbers import geocoder, carrier, phonenumberutil  # For phone number parsing and details
import phonenumbers  # To handle and validate phone numbers

def track_phone_number(phone_number):
    """
    Tracks details about a given phone number including:
    - Location
    - Carrier
    - Latitude and Longitude
    - State, District, and PinCode
    - Google Maps link
    """
    details = {}
    try:
        # Validate phone number format
        if not phone_number.startswith("+"):
            raise ValueError("Phone number must start with '+' followed by the country code.")

        # Parse the phone number
        parsed_number = phonenumbers.parse(phone_number)

        # Get general location (e.g., country or region)
        location = geocoder.description_for_number(parsed_number, "en")
        details["Location"] = location

        # Get the carrier (SIM provider) for the number
        sim_carrier = carrier.name_for_number(parsed_number, "en")
        details["Carrier"] = sim_carrier

        # Print basic information about the phone number
        print(f"Location: {location}")
        print(f"Carrier: {sim_carrier}")

        # Initialize the geopy geolocator with a custom user-agent
        geolocator = Nominatim(user_agent="trak_ui_app")

        try:
            # Get geocoded location (latitude and longitude) based on the general location
            geo_location = geolocator.geocode(location)

            if geo_location:
                latitude = geo_location.latitude
                longitude = geo_location.longitude
                details["Latitude"] = latitude
                details["Longitude"] = longitude

                # Print latitude and longitude
                print(f"Coordinates: Latitude {latitude}, Longitude {longitude}")

                # Reverse geocode to fetch detailed address
                detailed_location = geolocator.reverse((latitude, longitude), exactly_one=True)

                if detailed_location and detailed_location.raw.get("address"):
                    # Extract detailed information from the raw address data
                    address = detailed_location.raw["address"]
                    state = address.get("state", "Not Available")  # Get state
                    district = address.get("county", "Not Available")  # Get district
                    pinCode = address.get("postcode", "Not Available")  # Get pinCode
                    details["State"] = state
                    details["District"] = district
                    details["PinCode"] = pinCode

                    # Print detailed information
                    print(f"State: {state}")
                    print(f"District: {district}")
                    print(f"PinCode: {pinCode}")

                    # Generate and print a Google Maps link for the coordinates
                    google_maps_link = f"https://www.google.com/maps?q={latitude},{longitude}"
                    details["GoogleMapsLink"] = google_maps_link
                    print(f"Google Maps Link: {google_maps_link}")
                else:
                    print("Detailed address not found.")
                    details["Error"] = "Detailed address not found."
            else:
                print("Geolocation not found.")
                details["Error"] = "Geolocation not found."
        except Exception as e:
            # Handle geolocation errors (e.g., no internet, geocoding limits)
            print(f"Error during geolocation: {e}")
            print("Check your internet connection or try again later.")
            details["Error"] = str(e)
    except phonenumberutil.NumberParseException as e:
        # Handle errors during phone number parsing
        print(f"Error parsing phone number: {e}")
        details["Error"] = str(e)
    except ValueError as e:
        # Handle validation errors
        print(f"Validation error: {e}")
        details["Error"] = str(e)
    
    return details

# Entry point for the program
if __name__ == "__main__":
    # Prompt the user to input a phone number
    phone_number = input("Enter phone number with country code (e.g., +14155552671): ")
    result = track_phone_number(phone_number)
    print("\nFinal Details:", result)
