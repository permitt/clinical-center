HALL_ASSIGNED_TITLE = "Operating room assigned"
HALL_ASSIGNED_BODY = """

Dear,

A operating room has been assigned to your appointment
Below are the details.
Date: %s
Time: %s
Operating room: %s



Best regards,
Administrator 

"""

HALL_ASSIGNED_CONFIRM_TITLE = "Operating Room has been assigned for your appointment"
HALL_ASSIGNED_CONFIRM_BODY = """
Dear,

A operating room has been assigned to your appointment
Below are the details.
Date: %s
Time: %s
Operating room: %s

It is saved in our calendar automatically.
If you wish to cancel it, please click <a href="http://localhost:8000/api/clinics/app/%s/%s/">here.</a>

Best regards,
Administrator 
"""