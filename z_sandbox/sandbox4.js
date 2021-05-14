`async updateBadge({ email, firstname, lastname }, badgeAssertionEntityId) {
    if (!email || !badgeAssertionEntityId) throw new Error('Email and badge ID are required to update a badge.');

    const token = BADGR_AUTH_TOKEN || await BadgrService.getToken();

    return makeBadgrRequest({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        recipient: {
          identity: email,
          type: 'email',
          hashed: true,
          plaintextIdentity: email,
        },
        extensions: {
          'extensions:recipientProfile': {
            '@context':'https://openbadgespec.org/extensions/recipientProfile/context.json',
            type: ['Extension', 'extensions:RecipientProfile'],
          },
        },
      },
    }, { verboseLogging: true })
      .then(data => BadgrService.saveAssertions(data.result));
  },`

`async updateBadge({ email, firstname, lastname }, badgeAssertionEntityId) {
    if (!email || !badgeAssertionEntityId) throw new Error('Email and badge ID are required to update a badge.');

    const token = BADGR_AUTH_TOKEN || await BadgrService.updateAuthToken();

    return makeBadgrRequest({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        recipient: {
          identity: email,
          type: 'email',
          hashed: true,
          plaintextIdentity: email,
        },
        extensions: {
          'extensions:recipientProfile': {
            '@context':'https://openbadgespec.org/extensions/recipientProfile/context.json',
            type: ['Extension', 'extensions:RecipientProfile'],
          },
        },
      },
    }, { verboseLogging: true })
      .then(data => BadgrService.saveAssertions(data.result));
  },`

  console.log('a.length', a.length)
  console.log('b.length', b.length)