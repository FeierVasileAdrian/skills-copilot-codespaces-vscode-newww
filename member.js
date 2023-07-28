function skillsMember()
{
    var member = document.getElementById("member").value;
    var memberError = document.getElementById("memberError");
    var memberRegex = /^[a-zA-Z0-9]+$/;
    if(member.length == 0)
    {
        memberError.innerHTML = "Please enter your member name";
        return false;
    }
    else if(member.length < 3)
    {
        memberError.innerHTML = "Member name must be at least 3 characters";
        return false;
    }
    else if(!memberRegex.test(member))
    {
        memberError.innerHTML = "Member name must be alphanumeric";
        return false;
    }
    else
    {
        memberError.innerHTML = "";
        return true;
    }
}
